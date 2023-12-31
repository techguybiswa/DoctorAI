import { Box, Skeleton } from "@mui/material";
interface LoadingSkeletonProps {
  height?: string;
  width?: string;
}
export default function LoadingSkeleton(props: LoadingSkeletonProps) {
  const { height, width } = props;
  return (
    <Box sx={{ width: width ?? "100%", height: height ?? "100%" }}>
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
    </Box>
  );
}
