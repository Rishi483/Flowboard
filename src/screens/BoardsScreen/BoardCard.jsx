import OpenIcon from "@mui/icons-material/Launch"
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const colors=[
    "#F49D6E",
    "#E85A4F",
    "#FFD166",
    "#8ABEB7",
    "#247BA0",
    "#D3D3D3",
]

const BoardCard = ({name,color,createdAt,id}) => {
    const navigate=useNavigate();
  return (
    <Grid item sm={3} xs={12}>
        <Stack p={2} bgcolor="background.paper" borderLeft="5px solid" borderColor={colors[color]}>
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
            <Box width="50%">
                <Typography whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" fontWeight={400} variant="h6">
                    {name}
                </Typography>
            </Box>
            <IconButton onClick={()=>navigate(`/boards/${id}`)} size="small">
                <OpenIcon/>
            </IconButton>
        </Stack>
        <Typography variant="caption">
            Created at: {String(createdAt)}
        </Typography>
        </Stack>
    </Grid>
  )
}

export default BoardCard
