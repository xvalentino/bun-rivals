import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TeammatesTabProps } from "./types";

export function TeammatesTab({ data }: TeammatesTabProps) {
  const { teamMates } = data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Teammates</CardTitle>
      </CardHeader>
      <CardContent>
        {teamMates && teamMates.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teammate ID</TableHead>
                <TableHead>Nickname</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMates.map((teammate, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {teammate.player_info?.player_uid || "N/A"}
                  </TableCell>
                  <TableCell>
                    {teammate.player_info?.nick_name || "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No teammate data available</p>
        )}
      </CardContent>
    </Card>
  );
} 