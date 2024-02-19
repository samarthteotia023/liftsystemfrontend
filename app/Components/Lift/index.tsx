"use client";

const Lifts = [
  { floor: 6 },
  { floor: 5 },
  { floor: 4 },
  { floor: 3 },
  { floor: 2 },
  { floor: 1 },
  { floor: 0 },
];
interface Lift {
  data: any;
  mintime:any
  handlefloor: (floor: number) => void;
  handleChange: (values: any) => void;
}

const Lift = ({ data, handlefloor,mintime, handleChange }: Lift) => {
  console.log(data, "data");
  return (
    <div className="flex justify-center p-3 bg-gray-400 w-9/12 gap-8 items-center">
      <div className="flex justify-between  p-2 w-11/12 h-[980px]  ">
        {data?.map((item: any) => {
          return (
            <div className=" bg-gray-600 px-7 flex h-full flex-col justify-end items-center">
              <div
                key={item.id}
                style={{ marginBottom: `${140 * item.currentfloor}px` ,transitionDuration:`${mintime*2}s`}}
                className={`flex justify-between ${
                  item.maintenance == true ? "border-red-500" : ""
                } ${
                  item.currentfloor === 4 ? "mb-[550px]" : ""
                } anim  items-center  border-gray-500 border gap-1 h-20 w-16`}
              >
                <div className="bg-gray-500 flex justify-center items-center h-full w-1/2">
                  {item.currentfloor}
                </div>
                <div className="bg-gray-500 justify-center items-center flex h-full w-1/2">
                  {item.id}
                </div>
              </div>
              <div>
                <div className="mt-3">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      onChange={() => handleChange(item)}
                      checked={item?.maintenance}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex p-8  flex-col justify-between h-[980px] items-center">
        {Lifts.map((item: any) => (
          <div className="flex justify-between mb-3 gap-5 items-center">
            <button
              onClick={() => {
                handlefloor(item.floor);
              }}
              className={` ${
                item.floor == 0 ? "hidden" : ""
              } rounded-full flex  justify-center items-center p-2 border border-gray-500 bg-white`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                />
              </svg>
            </button>
            <button
              onClick={() => {
                handlefloor(item.floor);
              }}
              className={` ${
                item.floor == 6 ? "hidden" : ""
              } rounded-full flex justify-center items-center p-2 border border-gray-500 bg-white`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lift;
