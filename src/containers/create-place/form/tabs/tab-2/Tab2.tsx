import { Fragment, memo, useMemo } from "react";
import { IPlaceType } from "@/services/place-types-service/place-type.interface";
import { IPlaceCategory } from "@/services/place-categories-service/place-category.interface";
import { IPlaceTabProps } from "@/containers/create-place/form/interfaces";
import CommercialSelect from "@/containers/create-place/form/tabs/tab-2/content/CommercialSelect";
import PlaceTypesSelect from "@/containers/create-place/form/tabs/tab-2/content/PlaceTypesSelect";
import PlaceCategoriesSelect from "@/containers/create-place/form/tabs/tab-2/content/PlaceCategoriesSelect";
import Tab2Title from "@/containers/create-place/form/tabs/tab-2/content/Tab2Title";
import AttachmentsSelect from "@/containers/create-place/form/tabs/tab-2/content/AttachmentsSelect";

interface ITab2Props extends IPlaceTabProps {
  placeTypes: IPlaceType[];
  categories: IPlaceCategory[];
  canDeleteAttachments?: boolean;
}

const Tab2 = ({
  placeTypes,
  categories,
  readonly,
  canDeleteAttachments,
}: ITab2Props) => {
  return (
    <Fragment>
      <Tab2Title />
      <CommercialSelect readonly={readonly} />
      <PlaceTypesSelect placeTypes={placeTypes} readonly={readonly} />
      <PlaceCategoriesSelect categories={categories} readonly={readonly} />
      <AttachmentsSelect
        canDeleteByAPI={canDeleteAttachments}
        readonly={readonly}
      />
    </Fragment>
  );
};

export default memo(Tab2);
