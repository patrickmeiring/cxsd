// This file is part of cxsd, copyright (c) 2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import {Namespace} from './Namespace';
import {Member} from './Member';
import {MemberRef} from './MemberRef';

export class Type {
	constructor(name: string) {
		this.surrogateKey = Type.nextKey++;
		this.name = name;
	}

	// TODO: handle naming collisions between attributes and children,
	// and between namespaces.
	buildMemberTbl() {
		var ref: MemberRef;

		if(this.attributeList) for(ref of this.attributeList) this.attributeTbl[ref.member.name] = ref;
		if(this.childList) for(ref of this.childList) this.childTbl[ref.member.name] = ref;
	}

	name: string;
	namespace: Namespace;
	safeName: string;
	bytePos: number;

	/** Primitive type of child text node if defined
	  * (representable as a JavaScript value). */
	primitiveType: Type;
	/** List of allowed literal values, if such a restriction is defined. */
	literalList: string[];

	/** Type only contains a child text node and no other data. */
	isPlainPrimitive: boolean;

	isList: boolean;

	attributeTbl: {[name: string]: MemberRef} = {};
	childTbl: {[name: string]: MemberRef} = {};
	/** XML attributes in an element of this type. */
	attributeList: MemberRef[];
	/** Allowed child elements for an element of this type. */
	childList: MemberRef[];
	/** TODO: Other types added as mixins. */
	// groupList: Member[];

	/** Parent type this is derived from. */
	parent: Type;

	/** For an anonymous type, the member (of another type) that it defines.
	  * Used for giving the type a descriptive name. */
	containingType: Type;
	containingMember: Member;

	comment: string;

	surrogateKey: number;
	private static nextKey = 0;

	static primitiveFlag = 1;
	static plainPrimitiveFlag = 2;
	static listFlag = 4;
}
