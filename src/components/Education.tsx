import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaUniversity, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { educationItems } from '../data';


// Animation variant for fade-in effect used throughout the component
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Education: React.FC = () => {
  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-4">
        {/* Section heading with animation */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Education</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My academic background and continuous learning journey.
          </p>
        </motion.div>
        {/* Education history cards container */}
        <div className="max-w-4xl mx-auto mb-16">
          {educationItems.map((edu) => (
            <motion.div
              key={edu.id}
              className="mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
                <div className="p-6">
                  {/* Education header with degree and institution */}
                  <div className="flex items-center mb-3">
                    {/* Graduation cap icon in a circular container */}
                    <div className="w-12 h-12 flex items-center justify-center bg-blue-500/20 text-blue-400 rounded-full mr-3">
                      <FaGraduationCap size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-blue-400">{edu.degree}</h3>
                      <div className="flex items-center">
                        <FaUniversity className="mr-1 text-gray-500 dark:text-gray-400" />
                        <span className="font-medium">{edu.institution}</span>
                      </div>
                    </div>
                  </div>
                  {/* Location and time period metadata */}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-1" />
                      <span>{edu.location}</span>
                    </div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-1" />
                      <span>{edu.period}</span>
                    </div>
                  </div>
                  {/* Education description */}
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{edu.description}</p>
                  {/* Academic achievements section */}
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Grades</h4>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="flex">
                          <span className="mr-2">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Relevant coursework section - conditionally rendered if courses exist */}
                  {edu.courses && (
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Relevant Coursework</h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.map(course => (
                          <span
                            key={course}
                            className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-blue-800 dark:text-blue-300 text-xs rounded-full"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Certifications section */}
      </div>
    </section>
  );
};

export default Education;