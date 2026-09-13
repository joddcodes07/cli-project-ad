import React from 'react';
import { Box } from 'ink';

export const Layout = ({ children }) => {
    return (
        <Box flexDirection="column" borderStyle="round" borderColor="cyan" padding={1} width={80}>
            {children}
        </Box>
    );
};