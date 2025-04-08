import { Box } from '../../../../../../react-digital-ui';
import PublicInfo from './components/PublicInfo';
import SecurityFields from './SecurityFields';

export default function UserView() {
    return (
        <Box gap={3} fullWidth>
            <PublicInfo />
            <SecurityFields>
                <SecurityFields.Password />
                <SecurityFields.Email />
            </SecurityFields>
        </Box>
    );
}
