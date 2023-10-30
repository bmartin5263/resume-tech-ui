export class IconType {
  css: string;


  static NORMAL = new IconType("material-icons")
  static OUTLINED = new IconType("material-icons-outlined")

  constructor(css: string) {
    this.css = css
  }
}

type IconProps = {
  id?: string,
  style?: React.CSSProperties,
  children?: React.ReactNode,
  name?: string,
  type?: IconType
}

function Icon(props: IconProps) {
  var type = props.type ?? IconType.NORMAL;
  var className = 'icon ' + type.css;

  return (
    <span id={props.id} style={props.style} className={className}>
      {props.children != null ? props.children : props.name}
    </span>
  )
}

export default Icon;