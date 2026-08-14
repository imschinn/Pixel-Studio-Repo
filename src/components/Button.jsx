import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const base =
  'inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold tracking-wide uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2';

const variants = {
  primary: 'bg-gold text-ink hover:bg-gold-soft',
  outline: 'border border-ivory/40 text-ivory hover:border-gold hover:text-gold',
  ghost: 'text-ivory hover:text-gold',
  dark: 'bg-ink text-ivory border border-ivory/20 hover:border-gold hover:text-gold',
};

export default function Button({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  icon: Icon,
  disabled = false,
  ...rest
}) {
  const classes = `${base} ${variants[variant]} ${className} ${disabled ? 'opacity-50 pointer-events-none' : ''}`;

  const content = (
    <motion.span
      className={classes}
      whileHover={disabled ? {} : { y: -2 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      transition={{ duration: 0.2 }}
    >
      {children}
      {Icon && <Icon size={16} strokeWidth={2} />}
    </motion.span>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block" {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block" {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className="inline-block" {...rest}>
      {content}
    </button>
  );
}
