import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Verificar se há uma sessão salva no localStorage
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [userEmail, setUserEmail] = useState(() => {
    // Recuperar email salvo do localStorage
    return localStorage.getItem('userEmail') || "";
  });
  const { toast } = useToast();

  // Salvar estado de autenticação no localStorage quando mudar
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', userEmail);
    } else {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userEmail');
    }
  }, [isAuthenticated, userEmail]);

  const handleLogin = (email: string, password: string) => {
    // Simulate authentication
    setUserEmail(email);
    setIsAuthenticated(true);
    
    toast({
      title: "Login realizado com sucesso!",
      description: `Bem-vindo ao sistema, ${email}`,
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail("");
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado do sistema",
    });
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  if (isAuthenticated) {
    return <Dashboard onLogout={handleLogout} userEmail={userEmail} />;
  }

  return (
    <LoginForm
      onLogin={handleLogin}
      onToggleMode={toggleMode}
      isSignUp={isSignUp}
    />
  );
};

export default Index;
