import { Fragment, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "../../components/ui/table";

import { addProductFormElements } from "../../config";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Sheet } from "@/components/ui/sheet";
import CommonForm from "@/components/common/form";

// INITIAL FORM DATA
const initialFromData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const AdminProducts = () => {
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [formData, setFormData] = useState<any>(initialFromData);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Fragment>
      {/* BUTTON TO ADD PRODUCT */}
      <div className="mb-5 flex justify-end">
        <Button
          className="bg-primary text-white"
          onClick={() => setOpenAddProduct(true)}
        >
          Add Product
        </Button>
      </div>

      {/* PRODUCTS TABLE */}
      <div className="mb-5 flex justify-end"></div>
      <Sheet
        open={openAddProduct}
        onOpenChange={() => setOpenAddProduct(false)}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              buttonText="Add Product"
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
