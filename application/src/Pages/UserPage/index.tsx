import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import CreateUserModal from "./CreateUserModal";
import { CachePolicies, useFetch } from "use-http";
import { isEmpty } from "lodash";
import { UserType } from "./user.type";

export default function UserPage() {
  const {
    loading,
    data: users,
    get: refresh,
  } = useFetch("/api/users", { cachePolicy: CachePolicies.NO_CACHE }, []);

  return (
    <div>
      <CreateUserModal callbackSuccess={refresh} />

      <TableContainer
        component={Paper}
        sx={{ maxHeight: "calc(100vh - 300px)" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Career</TableCell>
              <TableCell>Job</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
            {!loading && (
              <>
                {!isEmpty(users) &&
                  users.map((row: UserType) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.age}</TableCell>
                      <TableCell>{row.career}</TableCell>
                      <TableCell>{row.job}</TableCell>
                      <TableCell>
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                {isEmpty(users) && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography>No user found.</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
