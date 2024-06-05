import { useEffect, useState, useCallback } from "react";
import config from "@/config";

const CACHE_KEY = "projectsCache";
const CACHE_EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour

const useProjects = (username: string) => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch repositories and their languages from GitHub
    const fetchReposAndLanguages = useCallback(async () => {
        const res = await fetch(
            `https://api.github.com/users/${username}/repos`
        );
        const repos = await res.json();

        const enhancedRepos = await Promise.all(
            repos.map(async (repo: any) => {
                const languagesRes = await fetch(repo.languages_url);
                const languages = await languagesRes.json();
                repo.languages = Object.keys(languages);
                repo.repo_preview = `https://raw.githubusercontent.com/${username}/${repo.name}/main/repo_assets/preview.png`;
                repo.description = [repo.description]; // Wrap description in an array
                return repo;
            })
        );

        return enhancedRepos;
    }, [username]);

    // Get cached projects from localStorage if available and not expired
    const getCachedProjects = useCallback(() => {
        if (typeof window !== "undefined") {
            const cachedData = localStorage.getItem(CACHE_KEY);
            if (cachedData) {
                const parsedData = JSON.parse(cachedData);
                const currentTime = Date.now();
                if (
                    currentTime - parsedData.timestamp <
                    CACHE_EXPIRATION_TIME
                ) {
                    return parsedData.projects;
                }
            }
        }
        return null;
    }, []);

    // Fetch projects from GitHub and update cache
    const fetchProjectsAndUpdateCache = useCallback(async () => {
        const projects = await fetchReposAndLanguages();
        if (typeof window !== "undefined") {
            localStorage.setItem(
                CACHE_KEY,
                JSON.stringify({ projects, timestamp: Date.now() })
            );
        }
        return projects;
    }, [fetchReposAndLanguages]);

    // Load projects either from cache or by fetching from GitHub
    const loadProjects = useCallback(async () => {
        let projects = getCachedProjects();
        if (!projects) {
            projects = await fetchProjectsAndUpdateCache();
        }

        const combinedProjects = projects.concat(config.projects);
        const filteredProjects = combinedProjects.filter((repo: any) =>
            config.showedProjects.includes(repo.name)
        );

        setProjects(filteredProjects);
        setIsLoading(false);
    }, [fetchProjectsAndUpdateCache, getCachedProjects]);

    useEffect(() => {
        loadProjects();
    }, [loadProjects]);

    return { projects, isLoading };
};

export default useProjects;
