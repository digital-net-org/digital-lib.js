/* eslint react-hooks/rules-of-hooks: 0 */
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Color } from '../../../react-elements';
import { Box } from '../Box';
import { Button } from '../Button';
import { Icon } from '../Icon';
import PopOver, { type PopOverProps } from './PopOver';

const meta: Meta<PopOverProps> = {
    title: 'Layout/PopOver',
    component: PopOver,
    decorators: () => {
        const [align, setAlign] = React.useState<'center' | 'start' | 'end'>('center');
        const [justify, setJustify] = React.useState<'center' | 'start' | 'end'>('center');

        const [open, setOpen] = React.useState(false);
        const [direction, setDirection] = React.useState<'left' | 'right'>('left');
        const [includeButton, setIncludeButton] = React.useState(false);
        const [backgroundColor, setBackgroundColor] = React.useState(Color.getRandomColor());
        const ref = React.useRef(null);

        const handleDirection = (direction: 'left' | 'right' | 'up' | 'down') => {
            switch (direction) {
                case 'up':
                    if (align === 'center') {
                        setAlign('start');
                    } else if (align === 'end') {
                        setAlign('center');
                    }
                    break;
                case 'down':
                    if (align === 'center') {
                        setAlign('end');
                    } else if (align === 'start') {
                        setAlign('center');
                    }
                    break;
                case 'left':
                    if (justify === 'center') {
                        setJustify('start');
                    } else if (justify === 'end') {
                        setJustify('center');
                    }
                    break;
                case 'right':
                    if (justify === 'center') {
                        setJustify('end');
                    } else if (justify === 'start') {
                        setJustify('center');
                    }
                    break;
            }
        };

        return (
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: '100vh',
                    width: '100vw',
                }}
            >
                <Box
                    fullWidth
                    fullHeight
                    align={align}
                    justify={justify}
                    direction="row"
                    gap={3}
                    color={backgroundColor}
                >
                    <Box gap={2}>
                        <Button ref={ref} onClick={() => setOpen(!open)}>
                            Toggle
                        </Button>
                    </Box>
                </Box>
                <div
                    style={{
                        position: 'absolute',
                        top: '50px',
                        left: 0,
                    }}
                >
                    <Box direction="row">
                        <Button variant="icon" onClick={() => handleDirection('left')}>
                            <Icon.ArrowIcon direction="right" variant="filled" />
                        </Button>
                        <Button variant="icon" onClick={() => handleDirection('up')}>
                            <Icon.ArrowIcon direction="down" variant="filled" />
                        </Button>
                        <Button variant="icon" onClick={() => handleDirection('right')}>
                            <Icon.ArrowIcon direction="left" variant="filled" />
                        </Button>
                        <Button variant="icon" onClick={() => handleDirection('down')}>
                            <Icon.ArrowIcon direction="up" variant="filled" />
                        </Button>
                    </Box>
                </div>
                <PopOver
                    anchor={ref.current}
                    includeAnchor={includeButton}
                    open={open}
                    onOpen={() => setBackgroundColor(Color.getRandomColor())}
                    onClose={() => setOpen(!open)}
                    direction={direction}
                >
                    <Box gap={2}>
                        <Box gap={2}>
                            <Button onClick={() => setDirection(direction === 'left' ? 'right' : 'left')}>
                                Change direction
                            </Button>
                            <Button onClick={() => setIncludeButton(includeButton => !includeButton)}>
                                Include anchor
                            </Button>
                        </Box>
                        <Box>Some cool content</Box>
                    </Box>
                </PopOver>
            </div>
        );
    },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Primary: Story = {};
