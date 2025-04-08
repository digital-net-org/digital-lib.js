import SecurityFields from './SecurityFields';
import PasswordField from './PasswordField';
import EmailField from './EmailField';

export default Object.assign(SecurityFields, {
    Password: PasswordField,
    Email: EmailField,
});
