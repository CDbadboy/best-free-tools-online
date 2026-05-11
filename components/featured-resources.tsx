import { resources } from '@/lib/resources';
import ResourceCard from './resource-card';

export default function FeaturedResources() {
  const featured = resources.slice(0, 8);

  return (
    <section className="mb-8">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-100">🌟 热门推荐</h2>
        <p className="text-sm text-gray-500 mt-1">精选最受欢迎的免费工具</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featured.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  );
}
