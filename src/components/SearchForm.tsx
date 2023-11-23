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

    try {
      const response = await fetch(`/api/search-car?term=${e.target.value}`);

      const results = await response.json();

      onResults(results);
    } catch (error) {
      onResults([]);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="grid gap-4">
        <div className="grid gap-4">
          <Input
            name="search"
            placeholder="Search by model or brand..."
            onChange={debounce(onSearchTermChange, 500)}
          />
        </div>
      </div>
    </form>
  );
}
