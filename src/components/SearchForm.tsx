import { ChangeEvent } from "react";

import { Input } from "@booking/@components/ui/input";
import { debounce } from "@booking/lib/util";
import type { Car } from "@booking/types/booking";

interface SearchFormProps {
  onResults: (results: Car[]) => void;
  resetCarList?: () => void;
}

export default function SearchForm(
  { onResults, resetCarList }: SearchFormProps = {
    onResults: () => {},
  },
) {
  const onSearchTermChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 1) {
      resetCarList && resetCarList();
      return;
    }

    const response = await fetch(`/api/search-car?term=${e.target.value}`);

    const results = await response.json();

    onResults(results);
  };

  return (
    <form>
      <div className="grid gap-4">
        <div className="grid gap-4">
          <Input
            name="search"
            placeholder="Search term..."
            onChange={debounce(onSearchTermChange, 500)}
          />
        </div>
      </div>
    </form>
  );
}
