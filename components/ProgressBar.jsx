import React from 'react';
import { Box, Text } from 'ink';

export const ProgressBar = () => {
    return (
        <Box marginTop={1} flexDirection="row">
            <Text color="gray">0:00 </Text>
            <Text color="cyan">{'━'.repeat(60)}</Text>
            <Text color="gray"> 0:00</Text>
        </Box>
    );
};