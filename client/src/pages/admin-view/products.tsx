// IMPORTS
import { Fragment, useEffect, useState } from "react";

// CONFIG
import { addProductFormElements } from "../../config";

// COMPONENTS
import { Sheet } from "@/components/ui/sheet";
import { Button } from "../../components/ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import CommonForm from "@/components/common/form";
import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";

// REDUX
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
  addNewProduct,
  getAllProducts,
  deleteProduct,
  editProduct,
} from "@/store/admin/product-slice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// HOOKS
import { toast } from "@/hooks/use-toast";

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
  // SHEET STATE
  const [openAddProduct, setOpenAddProduct] = useState(false);

  // FORM STATE
  const [formData, setFormData] = useState<any>(initialFromData);
  const [currentEditedId, setCurrentEditedId] = useState<string | null>(null);

  // IMAGE STATE
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [imageLoadingState, setImageLoadingState] = useState<boolean>(false);

  // REDUX STATE
  const { products } = useSelector(
    (state: RootState) => state.adminProductStore
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentEditedId !== null) {
      dispatch(editProduct({ formData, id: currentEditedId })).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Product Updated Successfully",
            description: data?.payload?.message,
          });
          dispatch(getAllProducts());
          setFormData(initialFromData);
          setOpenAddProduct(false);
          setCurrentEditedId(null);
        } else {
          toast({
            title: "Product Update Failed",
            description: data?.payload?.message,
          });
        }
      });
    } else {
      dispatch(
        addNewProduct({
          ...formData,
          image: uploadedImageUrl,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Product Added Successfully",
            description: data?.payload?.message,
          });
          dispatch(getAllProducts());
          setImageFile(null);
          setFormData(initialFromData);
          setOpenAddProduct(false);
          setUploadedImageUrl(null);
        } else {
          toast({
            title: "Product Addition Failed",
            description: data?.payload?.message,
          });
        }
      });
    }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteProduct({ id })).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Product Deleted Successfully",
          description: data?.payload?.message,
        });
        dispatch(getAllProducts());
      } else {
        toast({
          title: "Product Deletion Failed",
          description: data?.payload?.message,
        });
      }
    });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

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
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products && products.length > 0 ? (
          products.map((product) => {
            return (
              <AdminProductTile
                product={product}
                key={product._id}
                formData={formData}
                setFormData={setFormData}
                setCurrentEditedId={setCurrentEditedId}
                setOpenAddProduct={setOpenAddProduct}
                handleDelete={handleDelete}
              />
            );
          })
        ) : (
          <div className="flex justify-center items-center h-screen">
            <p>No products found</p>
          </div>
        )}
      </div>
      <Sheet
        open={openAddProduct}
        onOpenChange={() => {
          setOpenAddProduct(false);
          setCurrentEditedId(null);
          setFormData(initialFromData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
              isCustomStyling={true}
            file={imageFile}
            setFile={setImageFile}
            url={uploadedImageUrl}
            setUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            isEditMode={!!currentEditedId}
          />
          <div className="py-6">
            <CommonForm
              isBtnDisabled={!isFormValid()}
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              buttonText={currentEditedId ? "Update Product" : "Add Product"}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
