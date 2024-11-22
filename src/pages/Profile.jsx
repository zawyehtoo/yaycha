import {
  Alert,
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { green } from "@mui/material/colors";

import Item from "../components/Item";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchUser } from "../libs/fetcher";
import { Alarm } from "@mui/icons-material";
import {formatRelative} from "date-fns";

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, isError, error, data } = useQuery(
    `users/${id}`,
    async () => fetchUser(id)
  );
  if (isError) {
    return (
      <Box>
        <Alert severity="warning">{error.message}</Alert>
      </Box>
    );
  }
  if (isLoading) {
    return <Box sx={{ textAlign: "center" }}>Loading...</Box>;
  }

  return (
    <Box>
      <Box sx={{ bgcolor: "banner", height: 150, borderRadius: 4 }}></Box>
      <Box
        sx={{
          mb: 4,
          marginTop: "-60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Avatar sx={{ width: 100, height: 100, bgcolor: pink[500] }} />
        <Box sx={{ textAlign: "center" }}>
          <Typography>{data.name}</Typography>
          <Typography sx={{ fontSize: "0.8em", color: "text.fade" }}>
            {data.bio}
          </Typography>
        </Box>
      </Box>
      {data.posts.map((post) => {
        return (
          <Card sx={{ mb: 2 }}>
            <CardContent sx={{ cursor: "pointer" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Alarm fontSize="10" color="success" />
                  <Typography variant="caption" sx={{ color: green[500] }}>
                    {formatRelative(post.created, new Date())}
                  </Typography>
                </Box>
              </Box>
				<Typography sx={{my:3}}>{post.content}</Typography>

            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}
