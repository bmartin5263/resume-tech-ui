type IconProps = {
  id: string,
  className: string, 
  style: React.CSSProperties,
  children: React.ReactNode,
  name: string,
  right: boolean,
  left: boolean
}

function Icon({id, className, style, children, name, right, left}: IconProps) {
  const classes = ["icon"];
  if (className != null) {
    classes.push(className);
  }
  if (style == null) {
    style = {}
  }

  if (right) {
    style.marginLeft = '.3em';
  }
  if (left) {
    style.marginRight = '.3em';
  }

  return <span id={id} style={style} className={classes.join(" ")}>{children != null ? children : name}</span>
}

export default Icon;