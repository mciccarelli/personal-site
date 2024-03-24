import data from './data.json';
import { ProjectList } from '@/components';

export default function Home() {
  const { projects } = data;

  return <main>{projects && <ProjectList items={projects} />}</main>;
}
