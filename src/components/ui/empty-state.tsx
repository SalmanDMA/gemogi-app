import { Empty, Button } from 'antd';
import Link from 'next/link';

interface EmptyStateProps {
  title?: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

export function EmptyState({
  title,
  description,
  buttonText,
  buttonLink,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 py-16 text-center bg-white dark:bg-slate-900/40 border rounded-2xl shadow-sm transition-colors duration-300 dark:border-slate-800/80">
      <Empty
        description={
          <div className="flex flex-col gap-2 mt-4">
            {title && (
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                {title}
              </h3>
            )}
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              {description}
            </p>
          </div>
        }
      >
        {buttonText && buttonLink && (
          <Link href={buttonLink} className="mt-4 inline-block">
            <Button type="primary" size="large" shape="round">
              {buttonText}
            </Button>
          </Link>
        )}
      </Empty>
    </div>
  );
}
