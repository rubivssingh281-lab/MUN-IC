/**
 * ProfileCard Component Class (Leadership Profiles)
 * Renders executive board and founder profiles
 */
export class ProfileCard {
    /**
     * @param {Object} data - Profile member data
     */
    constructor(data) {
        this.data = data;
    }

    render() {
        const highlightClass = this.data.badge ? 'highlighted-profile' : '';
        const badgeHtml = this.data.badge 
            ? `<div class="profile-badge">${this.data.badge}</div>` 
            : '';

        return `
            <div class="profile-card ${highlightClass}">
                ${badgeHtml}
                <div class="profile-img">
                    <img src="${this.data.image}" alt="${this.data.name}" loading="lazy" decoding="async" width="145" height="145">
                </div>
                <h4 class="text-gold">${this.data.title}</h4>
                <p class="profile-role">${this.data.name}</p>
                <p class="profile-bio">${this.data.bio}</p>
            </div>
        `;
    }
}
