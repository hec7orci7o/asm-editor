import {
  FiDownload,
  FiCopy,
  FiSmartphone,
  FiFolder,
  FiLayers,
} from "react-icons/fi";
import copy from "copy-to-clipboard";
import { useState } from "react";
import Tippy from "@tippyjs/react";

export default function SidebarD({ binary, memory }) {
  const estados = {
    conversor: "conversor",
    binario: "binary",
    memoria: "memory",
  };

  const [state, setState] = useState(estados["binario"]);
  const handleCopy = () => {
    if (state === estados["binario"]) {
      copy(String(binary[0]).replace(/,/g, "\n"), {
        debug: false,
        format: "text/plain",
      });
    } else if (state === estados["memoria"]) {
      copy(memory[0], {
        debug: false,
        format: "text/plain",
      });
    }
  };
  return (
    <div className="flex-auto flex divide-x divide-gray-500 bg-dark overflow-hidden text-base">
      <div className="flex flex-col items-center gap-6 h-full p-3">
        <Tippy
          arrow={false}
          placement="left"
          content={
            <span className="bg-gray-200 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
              Converter
            </span>
          }
        >
          <button onClick={() => setState(estados["conversor"])}>
            <FiSmartphone
              className={`text-lg stroke-1 
            ${state === estados["conversor"] ? "text-indigo-400" : ""}`}
            />
          </button>
        </Tippy>
        <Tippy
          arrow={false}
          placement="left"
          content={
            <span className="bg-gray-200 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
              Binary output
            </span>
          }
        >
          <button onClick={() => setState(estados["binario"])}>
            <FiFolder
              className={`text-lg stroke-1 
            ${state === estados["binario"] ? "text-indigo-400" : ""}`}
            />
          </button>
        </Tippy>
        <Tippy
          arrow={false}
          placement="left"
          content={
            <span className="bg-gray-200 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
              Memory output
            </span>
          }
        >
          <button onClick={() => setState(estados["memoria"])}>
            <FiLayers
              className={`text-lg stroke-1 
            ${state === estados["memoria"] ? "text-indigo-400" : ""}`}
            />
          </button>
        </Tippy>
      </div>
      <div className="flex-1 flex flex-col divide-y divide-gray-700 bg-dark overflow-hidden text-base">
        <div className="flex items-center justify-between gap-6 px-6 h-10">
          <span className="text-sm font-bold opacity-50 capitalize">
            output
          </span>
          {state !== estados["conversor"] && (
            <div className="flex items-center gap-6">
              <Tippy
                arrow={false}
                placement="top"
                content={
                  <span className="bg-gray-200 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
                    Download output
                  </span>
                }
              >
                <button onClick={() => {}}>
                  <FiDownload className="text-lg stroke-1 hover:text-green-300" />
                </button>
              </Tippy>
              <Tippy
                arrow={false}
                placement="top"
                content={
                  <span className="bg-gray-200 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
                    Copy output
                  </span>
                }
              >
                <button onClick={handleCopy}>
                  <FiCopy className="text-lg stroke-1 hover:text-green-300" />
                </button>
              </Tippy>
            </div>
          )}
        </div>
        {state === estados["conversor"] && <div></div>}
        {state === estados["binario"] && (
          <code className="h-full flex-1 p-6">
            {binary[1].map((line) => (
              <>{line}</>
            ))}
          </code>
        )}
        {state === estados["memoria"] && (
          <div className="text-base font-mono">
            <span>{memory[1]}</span>
          </div>
        )}
      </div>
    </div>
  );
}