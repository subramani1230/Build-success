import React, { useState } from 'react';

type LoginComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const LoginComponent: React.FC<LoginComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'username': '',
        'password': '',
        'parameterName': '',
    });
    const { _csrf, contextPath, error, message, pageContext } = data;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name) setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await onSubmit?.(formData);
    };

    return (
        <div className="auth-card-container">
            <div className="modern-card auth-card">
                <c:set var="contextPath" value={pageContext.request.contextPath}/>
        
        
        
        
        
        
        
        <header>
        <nav className="navbar navbar-expand-lg navbar-dark default-color-dark fixed-top">
            <a className="navbar-brand" href="/">App Name</a>
        </nav>
        </header>
        
        <div className="container">
        
            <form onSubmit={handleSubmit} method="POST" action="{contextPath}/login" className="form-signin">
                <h2 className="form-heading">Log in</h2>
        
                <div className="form-group {error != null ? 'has-error' : ''}">
                    <span>{message}</span>
                    <input name="username" type="text" className="form-control" placeholder="Username" autofocus="true"/>
                    <input name="password" type="password" className="form-control" placeholder="Password"/>
                    <span>{error}</span>
                    <input type="hidden" name={_csrf.parameterName} value={_csrf.token}/>
        
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Log In</button>
                    <h4 className="text-center"><a href="{contextPath}/registration">Create an account</a></h4>
                </div>
        
            </form>
        
        </div>
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script src="{contextPath}/resources/js/bootstrap.min.js"></script>
            </div>
        </div>
    );
};

export default LoginComponent;
