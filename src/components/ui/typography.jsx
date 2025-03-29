import React from "react"
import PropTypes from "prop-types"

const H1 = ({ className, children }) => {
  return (
    <h1
      className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}
    >
      {children}
    </h1>
  )
}

const H2 = ({ className, children }) => {
  return (
    <h2
      className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}
    >
      {children}
    </h2>
  )
}

const H3 = ({ className, children }) => {
  return (
    <h3
      className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}
    >
      {children}
    </h3>
  )
}

const H3Border = ({ className, children }) => {
  return (
    <h3
      className={`scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight ${className}`}
    >
      {children}
    </h3>
  )
}

const H4 = ({ className, children }) => {
  return (
    <h4
      className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}
    >
      {children}
    </h4>
  )
}

const ListStyle = ({ className, children }) => {
  return <ul className={`${className} list-disc [&>li]:mt-2`}>{children}</ul>
}

const LabelStyle = ({ className, children, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor} // Pass the htmlFor prop here
      className={`flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    >
      {children}
    </label>
  )
}

export default LabelStyle

const P = ({ className, children }) => {
  return (
    <p className={`leading-7 [&:not(:first-child)]:mt-6 ${className}`}>
      {children}
    </p>
  )
}

const Blockquote = ({ className, children }) => {
  return <blockquote className={`italic ${className}`}>{children}</blockquote>
}

const InlineCode = ({ className, children }) => {
  return (
    <code
      className={`relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold ${className}`}
    >
      {children}
    </code>
  )
}

const Lead = ({ className, children }) => {
  return (
    <p className={`text-xl text-muted-foreground ${className}`}>{children}</p>
  )
}

const PLead = ({ className, children }) => {
  return (
    <p className={`text-lg text-muted-foreground ${className}`}>{children}</p>
  )
}

const PLeadOption = ({ className, children }) => {
  return (
    <p className={`text-sm font-bold text-muted-foreground ${className}`}>
      {children}
    </p>
  )
}

const Large = ({ className, children }) => {
  return <div className={`text-lg font-semibold ${className}`}>{children}</div>
}

const Muted = ({ className, children }) => {
  return (
    <p className={`text-sm text-muted-foreground ${className}`}>{children}.</p>
  )
}

// PropTypes for type checking
H1.propTypes =
  H2.propTypes =
  H3.propTypes =
  H4.propTypes =
  P.propTypes =
  Blockquote.propTypes =
  InlineCode.propTypes =
  Lead.propTypes =
  Large.propTypes =
  Muted.propTypes =
    {
      className: PropTypes.string,
      children: PropTypes.node.isRequired,
    }

export {
  H1,
  H2,
  H3,
  H3Border,
  H4,
  P,
  Lead,
  PLead,
  ListStyle,
  LabelStyle,
  PLeadOption,
  Large,
  Muted,
  Blockquote,
  InlineCode,
}
