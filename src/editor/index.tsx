import { LexicalComposer } from '@lexical/react/LexicalComposer'
import ErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { useState, type FC } from 'react'
import { Box, Paper, Typography } from '@mui/material'

const onError = (error: Error) => {
  console.error(error)
}

export const Editor: FC = () => {
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  const initialConfig = {
    namespace: 'lexical-editor',
    theme: {},
    onError,
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        padding: t => t.spacing(0.25),
        backgroundColor: t => t.palette.background.paper,
        position: 'relative',
        minWidth: t => t.spacing(32),
      }}
    >
      <LexicalComposer initialConfig={initialConfig}>
        {/* <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} /> */}
        <Box sx={{ position: 'relative' }}>
          <RichTextPlugin
            contentEditable={(
              <Paper
                variant="outlined"
                sx={{ outline: 'none', padding: t => t.spacing(0, 2), zIndex: 1, position: 'relative', backgroundColor: 'transparent' }}
                component={ContentEditable}
              />
            )}
            placeholder={(
              <Box
                sx={{
                  position: 'absolute',
                  top: t => t.spacing(2.25),
                  left: t => t.spacing(2.25),
                  zIndex: 0,
                  userSelect: 'none',
                }}
              >
                <Typography color="gray">
                  Start typing...
                </Typography>
              </Box>
            )}
            ErrorBoundary={ErrorBoundary}
          />
        </Box>
      </LexicalComposer>
    </Paper>
  )
}