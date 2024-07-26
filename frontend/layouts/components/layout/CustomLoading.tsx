import { CircularProgress, Box } from "@mui/material";

interface CustomLoadingProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const CustomLoading: React.FC<CustomLoadingProps> = ({ isLoading, children }) => {
  return isLoading ? (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%" width={'100%'}>
      <CircularProgress />
    </Box>
  ) : (
    <>{children}</>
  );
};

export default CustomLoading;