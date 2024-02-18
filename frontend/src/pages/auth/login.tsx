import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Styled components
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full height of the viewport */
`;

const FormContainer = styled.div`
  max-width: 400px;
  width: 90%; /* 90% of the container */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const Login = () => {
  // State for keeping track of input values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Perform login authentication here
    console.log("Login button clicked!");
    console.log("Username:", username);
    console.log("Password:", password);

    try {
      const response = await axios.post("http://localhost:4000/api/auth/", {
        username,
        password,
      });
      const { token, expireDate } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("expireDate", expireDate);
      navigate("/catalog");
      setUsername("");
      setPassword("");
      toast.success("Login successful");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Login</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Username:</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <Button onClick={handleSubmit} type="submit">
            Login
          </Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default Login;
