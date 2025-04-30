import { useState, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../css/App-UkiyoE.css';

interface FormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface Errors {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

function LoginPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState<FormValues>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<Errors>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        validateField(name, value);
    };

    const validateField = (name: string, value: string) => {
        let error = '';
        switch (name) {
            case 'name':
                if (!value) {
                    error = 'Le nom est obligatoire.';
                } else if (value !== value.toUpperCase()) {
                    error = 'Le nom doit être en majuscules.';
                }
                break;
            case 'email':
                if (!value) {
                    error = "L'email est obligatoire.";
                } else {
                    const emailRegex = /^\S+@\S+\.[a-zA-Z]{2,6}$/;
                    if (!emailRegex.test(value)) {
                        error = "L'email est invalide.";
                    }
                }
                break;
            case 'password':
                if (!value) {
                    error = 'Le mot de passe est obligatoire.';
                } else if (value.length < 6) {
                    error = 'Le mot de passe doit contenir au moins 6 caractères.';
                }
                break;
            case 'confirmPassword':
                if (value !== form.password) {
                    error = 'Les mots de passe ne correspondent pas.';
                }
                break;
            default:
                break;
        }
        setErrors({ ...errors, [name]: error });
    };

    const getPasswordStrength = (password: string): number => {
        if (!password) return 0;
        let strength = 0;
        if (password.length >= 6) strength++;
        if (password.match(/[a-z]+/)) strength++;
        if (password.match(/[A-Z]+/)) strength++;
        if (password.match(/[0-9]+/)) strength++;
        if (password.match(/[$@#&!]+/)) strength++;
        return strength;
    };

    const passwordStrength = getPasswordStrength(form.password);

    const isFormValid = (): boolean => {
        return (
            !errors.name &&
            !errors.email &&
            !errors.password &&
            !errors.confirmPassword &&
            !!form.name &&
            !!form.email &&
            !!form.password &&
            !!form.confirmPassword
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isFormValid()) {
            navigate("/home");
        }
    }

    return (
        <motion.div
            className="App"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h1
                initial={{ y: -70 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.4 }}
            >
                Signup Form
            </motion.h1>
            <motion.form
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onSubmit={handleSubmit}
            >
                {Object.keys(form).map((key) => (
                    <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * Object.keys(form).indexOf(key) }}
                    >
                        <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                        <br />
                        <input
                            type={key === 'password' || key === 'confirmPassword' ? 'password' : 'text'}
                            id={key}
                            name={key}
                            value={form[key as keyof FormValues]}
                            onChange={handleChange}
                        />
                        <AnimatePresence>
                            {errors[key as keyof Errors] && (
                                <motion.p
                                    className="error"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {errors[key as keyof Errors]}
                                </motion.p>
                            )}
                        </AnimatePresence>
                        {key === 'password' && (
                            <div className="password-strength">
                                <motion.div
                                    className="strength-bar"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                                    transition={{ duration: 0.5 }}
                                ></motion.div>
                            </div>
                        )}
                    </motion.div>
                ))}
                <motion.button
                    type="submit"
                    disabled={!isFormValid()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                >
                    Submit
                </motion.button>
            </motion.form>
        </motion.div>
    );
}

export default LoginPage;