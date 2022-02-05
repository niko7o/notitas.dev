export const containerVariants = {
  active: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const itemVariants = {
  entering: {
    y: -60,
    opacity: 0
  },
  active: {
    y: 0,
    opacity: 1
  },
}