import React from 'react';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props)
    }
    static defaultProps = {
        //Array of NavBar.Section(title,route)
        sections: [],
        //Pass the title of the selected Section
        selected: ""
    }

    static Section(title,route) {
        return {
            title: title,
            route: route
        }
    }

    render() {
        const sectionElements = this.props.sections.map(section => 
            <li key={section.title} className={"NavBarElement" + (this.props.selected==section.title ? " selected" : "")}>
                <a href={section.route}>
                    {section.title}
                </a>
            </li>
        )
        return (
            <ul className="NavBar">
                {sectionElements}
            </ul>
        )
    }

}
