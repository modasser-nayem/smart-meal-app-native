import { Container } from "@/components/ui/Container";
import { LoginForm } from "@/components/screens/auth/LoginForm";

export default function LoginScreen() {
   return (
      <Container className="justify-center">
         <LoginForm />
      </Container>
   );
}
