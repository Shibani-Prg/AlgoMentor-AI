import { Code2, GitBranch, Network, Brain } from "lucide-react";

function Welcome({onTopicSelect}) {
  const topic = [
    {
      title: "Arrays",
      Icon: Code2,
      description: "Master array patterns",
    },
    {
      title: "Linked List",
      Icon: GitBranch,
      description: "Pointers and traversal",
    },
    {
      title: "Graphs",
      Icon: Network,
      description: "BFS, DFS and more",
    },
    {
      title: "Dynamic Programming",
      Icon: Brain,
      description: "Solve complex problems",
    },
  ];

  return (
    <section className="mx-auto flex min-h-full max-w-5xl flex-col justify-center px-6 py-12">
      <div className="mb-10 text-center">
        <div className="mb-6 inline-flex rounded-2xl bg-blue-500/10 p-4 text-blue-400">
          <Brain size={42} />
        </div>

        <h1 className="text-4xl font-bold">
          Your AI DSA Mentor
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-gray-400">
          Learn Data Structures and Algorithms with step-by-step
          explanations, interview patterns, dry runs and Java solutions.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {topic.map(({ title,description }) => (
          <button
            key={topic.title}
            onClick={() =>
               onTopicSelect(
                   `Teach me ${topic.title} from beginner level with examples and Java code`
      )
    }
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-blue-500/50 hover:bg-blue-500/5"
          >

            <h3 className="font-semibold">
              {title}
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              {description}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Welcome;