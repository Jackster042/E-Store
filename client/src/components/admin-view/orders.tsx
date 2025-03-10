import { Fragment } from "react";
import { Card, CardTitle, CardHeader, CardContent } from "../ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { useState } from "react";
import AdminOrderDetailsView from "./order-details";
import { Dialog } from "../ui/dialog";

const AdminOrdersView = () => {
  const [openOrderDetails, setOpenOrderDetails] = useState(false);
  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>INV001</TableCell>
                <TableCell>12/04/2024</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>
                  <Dialog
                    open={openOrderDetails}
                    onOpenChange={setOpenOrderDetails}
                  >
                    <Button onClick={() => setOpenOrderDetails(true)}>
                      View Details
                    </Button>
                    <AdminOrderDetailsView />
                  </Dialog>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default AdminOrdersView;
