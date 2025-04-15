import { FC } from "react";

interface EmailProps {
  name: string;
  email: string;
  message: string;
}

const Email: FC<Readonly<EmailProps>> = ({ name, email, message }) => (
  <div>
    <p>Hey {name} 👋,</p>
    <p>
      <strong>Your Email:</strong> 📧
    </p>
    <p>{email}</p>
    <p>
      <strong>Your Message:</strong> 💬
    </p>
    <p>{message}</p>
    <hr />
    <p>
      Thank you for your message, {name}! 😊 I will reply as soon as I can. 🕒
    </p>
    <p>&copy; {new Date().getFullYear()} lorenzopalaia.com</p>
  </div>
);

export default Email;
