import { filterOptions } from "@/config";
import React, { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

type FilterOptions = keyof typeof filterOptions;

export interface Filter {
  sectionId: string;
  optionId: string;
  filters: Record<string, string[]>;
  // Add other properties as needed
}

const ProductFilter = ({
  filters,
  handleFilter,
}: {
  filters: Record<string, string[]>;
  handleFilter: (getSectionId: string, getOptionId: string) => void;
}) => {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div>
              <h3 className="text-base font-bold capitalize">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem as FilterOptions].map((options) => (
                  <Label
                    key={options.id}
                    className="flex items-center gap-2 font-medium"
                  >
                    <Checkbox
                      id={options.id}
                      onCheckedChange={() =>
                        handleFilter(keyItem, options.id || "")
                      }
                      // TODO: CHECK REASON FOR THIS NOT WORKING AND LATER OPTION IS WORKING
                      // checked={filters[keyItem]?.includes(options.id)}
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(options.id) > -1
                      }
                    />
                    <span className="text-sm">{options.label}</span>
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
