
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md mb-8 text-center">
        <a href="/" className="flex items-center justify-center space-x-2 mb-6">
          <div className="w-10 h-10 rounded-full bg-medical-600 flex items-center justify-center">
            <span className="text-white text-lg font-bold">PD</span>
          </div>
          <span className="font-medium text-2xl">PneumoDetect</span>
        </a>
        <h1 className="text-2xl font-semibold mb-2">Sign in to your account</h1>
        <p className="text-gray-600">
          Welcome back! Please enter your details.
        </p>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
