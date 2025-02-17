'use client'
import { cn } from "@/lib/utils";


export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    icon: JSX.Element;
  }[];
  className?: string;
}) => {

  return (
    <div
      className={cn(
        "w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block p-[1px] h-full w-full"
        >

          <div
            className="absolute inset-0 h-full w-full bg-color1/10 group-hover:bg-gradient-to-tr group-hover:from-[#A07CFE] group-hover:via-[#FE8FB5] group-hover:to-[#FFBE7B] transition-all block duration-300 rounded-2xl"
          />
          <Card>
            <div className="flex justify-start mb-4 text-zinc-200 text-5xl">
              {item.icon}
            </div>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full cursor-pointer p-4 overflow-hidden bg-gradient-to-b from-color2 via-[#0a0a0a] to-[#0a0a0a] backdrop-blur-lg backdrop-filter  relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-200 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-4 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
