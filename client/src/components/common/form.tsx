// UI COMPONENTS
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SelectItem } from "@radix-ui/react-select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

// FORM CONTROL
interface FormControl {
  name: string;
  label: string;
  componentType: "input" | "select" | "checkbox" | "radio" | "textarea";
  type: string;
  placeholder?: string;
  options?: {
    id: string;
    label: string;
  }[];
}

// TYPES

// FORM COMPONENT
const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}: {
  // TODO: CHECK LATER IF TYPES AS OK
  formControls: FormControl[];
  formData: any;
  setFormData: any;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonText: string;
}) => {
  // RENDER INPUTS BY COMPONENT TYPE
  //   TODO: CHECK IF THIS FUNCTION CAUSES RE-RENDER
  const renderInputsByComponentType = (controlItem: FormControl) => {
    let element = null;
    const value = formData[controlItem.name] || "";

    switch (controlItem.componentType) {
      case "input":
        element = (
          <Input
            type={controlItem.type}
            id={controlItem.name}
            placeholder={controlItem.placeholder}
            name={controlItem.name}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [controlItem.name]: e.target.value })
            }
          />
        );
        break;

      // SELECT
      case "select":
        element = (
          <Select
            value={value}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [controlItem.name]: value,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={controlItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {controlItem.options && controlItem.options.length > 0
                ? controlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      //   TEXTAREA
      case "textarea":
        element = (
          <Textarea
            id={controlItem.name}
            placeholder={controlItem.placeholder}
            name={controlItem.name}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [controlItem.name]: e.target.value })
            }
          />
        );
        break;

      default:
        element = (
          <Input
            type={controlItem.type}
            id={controlItem.name}
            placeholder={controlItem.placeholder}
            name={controlItem.name}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [controlItem.name]: e.target.value })
            }
          />
        );
        break;
    }
    return element;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div key={controlItem.name} className="grid w-full gap-1.5">
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button type="submit" className="mt-2 w-full">
        {buttonText || "submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
