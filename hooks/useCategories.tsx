import { useEffect, useState } from "react";
import { TThreadCategory } from "@/types/thread";
import { getThreadCategory } from "@/actions/thread/getThreadCategories";

const useCategory = () => {
  const [categories, setCategories] = useState<TThreadCategory[]>([]);
  const [mappedCategories, setMappedCategories] = useState<{
    [key: string]: string;
  }>({});
  useEffect(() => {
    getThreadCategory()
      .then(({ categoryList, mappedCategory }) => {
        setCategories(categoryList);
        setMappedCategories(mappedCategory);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return { categories, setCategories, mappedCategories, setMappedCategories };
};

export default useCategory;
