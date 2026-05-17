import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const categories = [
  { name: "Pets", icon: "🐶", desc: "Adopt a loving companion", color: "bg-orange-100 dark:bg-orange-900/20" },
  { name: "Pet Food", icon: "🍖", desc: "Nutritious meals for all pets", color: "bg-green-100 dark:bg-green-900/20" },
  { name: "Accessories", icon: "🧸", desc: "Toys, beds, collars & more", color: "bg-blue-100 dark:bg-blue-900/20" },
  { name: "Pet Care Products", icon: "💊", desc: "Health & grooming essentials", color: "bg-purple-100 dark:bg-purple-900/20" },
];

const CategorySection = () => {
  const [categoryText] = useTypewriter({
    words: ["Browse by Category"],
    loop: true,
    delaySpeed: 1000,
  });

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-6 py-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 min-h-[1.2em]">
        {categoryText}<Cursor cursorColor="hsl(var(--p))" />
      </h2>
      <p className="text-center text-base-content/50 mb-10">Find exactly what your pet needs</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link
              to={`/category-filtered-product/${cat.name}`}
              className={`${cat.color} rounded-3xl p-6 text-center hover:scale-105 transition-transform duration-200 border border-base-200 shadow-sm group block h-full`}
            >
              <div className="text-5xl mb-3">{cat.icon}</div>
              <h3 className="font-bold text-lg mb-1">{cat.name}</h3>
              <p className="text-sm text-base-content/60">{cat.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default CategorySection;
