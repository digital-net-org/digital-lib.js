import { Box } from '../../../../../../react-digital-ui';
import PublicInfo from './components/PublicInfo';
import Security from './components/Security';

export default function UserView() {
    return (
        <Box gap={3} fullWidth>
            <PublicInfo />
            <Security />
        </Box>
    );
}
