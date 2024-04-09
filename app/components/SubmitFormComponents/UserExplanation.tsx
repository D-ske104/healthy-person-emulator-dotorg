import { NavLink } from "@remix-run/react";
import { H1, H2 } from "../Headings";

const UserExplanation = () => {
    return(
        <div>
            <H1>健エミュ投稿フォーム</H1>
            <ul>
                <li>このフォームは、健常者エミュレータ事例集への投稿を促進するために作成されました。</li>
                <li>上から順にフォームへ入力することにより、過去の経験を整理することが可能です。</li>
                <li>入力した内容は端末内に保存されます。途中で入力を止めた場合でも、後から再開できます。</li>
                <li>投稿ボタンを押した時点で、以下の利用規約および<NavLink to="/privacyPolicy" className="text-blue-600 underline underline-offset-4">プライバシーポリシー・免責事項</NavLink>に同意したこととみなします。</li>
            </ul>
            <H2>利用規約</H2>
            <ul>
                <li>経験知ではない記事を投稿してはいけません。</li>
                <li>経験知の集積そのものを否定する投稿をしてはいけません。</li>
                <li>基本的人権を否定する投稿をしてはいけません。</li>
                <li>誹謗中傷や個人攻撃、暴言、プライバシー違反を含む投稿をしてはいけません。</li>
                <li>幼児的かつ性的な表現を含む投稿をしてはいけません。</li>
                <li>健常者エミュレータ事例集の理念にそぐわないと判断される場合、管理人の裁量により記事が削除されることがあります。</li>
            </ul>
            <p>暗黙知を共有し、現実世界をよりよく生きるすべを探しましょう。</p>
        </div>
    )
}

export default UserExplanation;