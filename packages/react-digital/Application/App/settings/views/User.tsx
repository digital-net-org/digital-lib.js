import { Avatar, Box, Text } from '../../../../../react-digital-ui';
import { useUser } from '@digital-lib/react-digital';

export default function User() {
    const { username } = useUser();
    return (
        <Box gap={2}>
            <Avatar />
            <Text variant="text">{username}</Text>
        </Box>
    );
}
