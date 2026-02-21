type StepName =
  | "Home"
  | "Route Results"
  | "Step-by-Step"
  | "PUJ List"
  | "PUJ Details"
  | "Favorites"
  | "Settings"
  | "Admin Dashboard";

interface Props {
  active: StepName;
}

export function TopStepperNav({ active }: Props) {
  const items: StepName[] = [
    "Home",
    "Route Results",
    "Step-by-Step",
    "PUJ List",
    "PUJ Details",
    "Favorites",
    "Settings",
    "Admin Dashboard",
  ];

  return (
    <div className="w-full bg-slate-50 border-b">
      <div className="max-w-4xl mx-auto flex flex-wrap gap-2 px-4 py-3 justify-center">
        {items.map((item, index) => {
          const isActive = item === active;
          return (
            <button
              key={item}
              type="button"
              className={`px-3 py-1.5 text-xs rounded-full border ${
                isActive
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
            >
              {index + 1}. {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}