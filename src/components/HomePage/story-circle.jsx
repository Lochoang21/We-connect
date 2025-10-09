import { Avatar, Box, Paper, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

export function StoryCircles() {
  const stories = [
    { name: "Your Story", avatar: "/placeholder.svg?height=56&width=56", hasStory: false },
    { name: "Justin Herwitz", avatar: "/placeholder.svg?height=56&width=56", hasStory: true },
    { name: "David Carradini", avatar: "/placeholder.svg?height=56&width=56", hasStory: true },
    { name: "Rakavy Sethi", avatar: "/placeholder.svg?height=56&width=56", hasStory: true },
    { name: "Chance Philips", avatar: "/placeholder.svg?height=56&width=56", hasStory: true },
    { name: "Emery Herwitz", avatar: "/placeholder.svg?height=56&width=56", hasStory: true },
    { name: "Nolan Philips", avatar: "/placeholder.svg?height=56&width=56", hasStory: true },
    { name: "Corey Siphron", avatar: "/placeholder.svg?height=56&width=56", hasStory: true },
  ];

  return (
    <Paper sx={{ p: 2, borderRadius: 2 }}>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          pb: 1,
          '&::-webkit-scrollbar': {
            height: 6
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.2)',
            borderRadius: 3
          }
        }}
      >
        {stories.map((story, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              minWidth: 64,
              cursor: 'pointer'
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={story.avatar}
                sx={{
                  width: 56,
                  height: 56,
                  border: story.hasStory ? 3 : 0,
                  borderColor: 'primary.main',
                  p: story.hasStory ? 0.5 : 0
                }}
              >
                {story.name[0]}
              </Avatar>
              {!story.hasStory && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 20,
                    height: 20,
                    backgroundColor: 'primary.main',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 2,
                    borderColor: 'background.paper'
                  }}
                >
                  <Add sx={{ fontSize: 14, color: 'primary.contrastText' }} />
                </Box>
              )}
            </Box>
            <Typography
              variant="caption"
              sx={{
                textAlign: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: 64
              }}
            >
              {story.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}