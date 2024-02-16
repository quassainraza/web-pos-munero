import { useState } from "react";
import styled from "styled-components";

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

  // Function to handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Perform login authentication here
    console.log("Login button clicked!");
    console.log("Username:", username);
    console.log("Password:", password);
    // Clear input fields after submission
    setUsername("");
    setPassword("");
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
          <Button type="submit">Login</Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default Login;
