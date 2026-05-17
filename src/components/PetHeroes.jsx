import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const petHeroes = [
  {
    id: 1,
    name: "Rahul Ahmed",
    pet: "Max the Golden Retriever",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    quote: "Adopting Max was the best decision of my life. He brings joy every single day!",
  },
  {
    id: 2,
    name: "Priya Sharma",
    pet: "Luna the Persian Cat",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300",
    quote: "Luna was rescued and now she's my whole world. Adoption changed both our lives.",
  },
  {
    id: 3,
    name: "Kamal Hossain",
    pet: "Bruno the German Shepherd",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    quote: "Bruno needed a home. Now I can't imagine home without him.",
  },
];

const PetHeroes = () => {
  const [heroesText] = useTypewriter({
    words: ["Meet Our Pet Heroes"],
    loop: true,
    delaySpeed: 1000,
  });

  return (
    <section className="bg-base-200/50 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 min-h-[1.2em]">
            {heroesText}<Cursor cursorColor="hsl(var(--p))" />
          </h2>
          <p className="text-center text-base-content/50 mb-10">Real people, real stories, real love</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {petHeroes.map((hero, index) => (
            <motion.div 
              key={hero.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="card bg-base-100 border border-base-200 shadow-md p-6 text-center"
            >
              <img
                src={hero.image}
                alt={hero.name}
                className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-primary"
              />
              <h3 className="font-bold text-lg">{hero.name}</h3>
              <p className="text-primary text-sm font-medium mb-3">{hero.pet}</p>
              <p className="text-base-content/60 text-sm italic">"{hero.quote}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PetHeroes;
