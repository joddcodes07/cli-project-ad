import React from 'react';
import { Box, Text } from 'ink';

export const KeyboardLegend = () => {
    return (
        <Box marginTop={1} justifyContent="center">
            <Text color="gray">[↑/↓] Navigate  [Enter] Play  [Space] Pause  [Q] Quit</Text>
        </Box>
    );
};